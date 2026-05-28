/** @type {import('firebase-functions').CloudFunctions} */
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
const db = admin.firestore();

exports.notifyCoachOnEnquiry = functions.firestore
  .document('coachpage_tenants/{tenantId}/enquiries/{enquiryId}')
  .onCreate(async (snap, context) => {
    const enquiry = snap.data();
    const tenantId = context.params.tenantId;

    try {
      const tenantDoc = await db
        .collection('coachpage_tenants')
        .doc(tenantId)
        .get();

      if (!tenantDoc.exists) {
        console.error('Tenant not found:', tenantId);
        return;
      }

      const tenant = tenantDoc.data();

      if (!tenant.whatsapp_notify_enabled) {
        console.log('WhatsApp notifications disabled for tenant:', tenantId);
        return;
      }

      const message =
        `🎓 New Enquiry Received!\n\n` +
        `Student: ${enquiry.student_name}\n` +
        `Parent Phone: ${enquiry.phone}\n` +
        `Standard: ${enquiry.standard}\n` +
        `Interested In: ${enquiry.interested_in || 'General'}\n` +
        `Preferred Batch: ${enquiry.preferred_batch || 'Not specified'}\n` +
        `City: ${enquiry.city || 'Not specified'}\n` +
        `Message: ${enquiry.message || 'No message'}\n\n` +
        `Reply on WhatsApp: wa.me/${enquiry.phone.replace(/[^0-9]/g, '')}`;

      const encodedMsg = encodeURIComponent(message);
      const phone = tenant.contact_phone || tenant.whatsapp_number;

      if (!phone) {
        console.error('No phone number found for tenant:', tenantId);
        return;
      }

      const cleanPhone = phone.replace(/[^0-9]/g, '');

      const url =
        `https://api.callmebot.com/whatsapp.php` +
        `?phone=${cleanPhone}` +
        `&text=${encodedMsg}` +
        `&apikey=${tenant.callmebot_api_key || ''}`;

      const response = await fetch(url);

      if (response.ok) {
        await snap.ref.update({ whatsapp_sent: true });
        console.log('WhatsApp notification sent successfully for enquiry:', context.params.enquiryId);
      } else {
        console.error('Failed to send WhatsApp notification:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error in notifyCoachOnEnquiry:', error);
    }
  });

exports.sendAutoReplyToStudent = functions.firestore
  .document('coachpage_tenants/{tenantId}/enquiries/{enquiryId}')
  .onCreate(async (snap, context) => {
    const enquiry = snap.data();
    const tenantId = context.params.tenantId;

    try {
      const tenantDoc = await db
        .collection('coachpage_tenants')
        .doc(tenantId)
        .get();

      if (!tenantDoc.exists) return;

      const tenant = tenantDoc.data();

      if (!tenant.whatsapp_notify_enabled) return;

      const studentPhone = enquiry.phone;
      if (!studentPhone) return;

      const instituteName = tenant.institute_name || 'the coaching institute';

      const autoReplyMessage =
        `Hello ${enquiry.student_name},\n\n` +
        `Thank you for enquiring at ${instituteName}!\n` +
        `We have received your request${enquiry.interested_in ? ` for ${enquiry.interested_in}` : ''}.\n\n` +
        `Our counsellor will call you within 30 minutes.\n\n` +
        `For immediate assistance:\n` +
        `📞 ${tenant.phone || ''}\n` +
        `💬 wa.me/${(tenant.whatsapp_number || tenant.contact_phone || '').replace(/[^0-9]/g, '')}`;

      const encodedMsg = encodeURIComponent(autoReplyMessage);
      const cleanPhone = studentPhone.replace(/[^0-9]/g, '');

      const url =
        `https://api.callmebot.com/whatsapp.php` +
        `?phone=${cleanPhone}` +
        `&text=${encodedMsg}` +
        `&apikey=${tenant.callmebot_api_key || ''}`;

      await fetch(url);
    } catch (error) {
      console.error('Error in sendAutoReplyToStudent:', error);
    }
  });

exports.sendFollowUpReminders = functions.pubsub
  .schedule('every day 09:00')
  .timeZone('Asia/Kolkata')
  .onRun(async (context) => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const tenantsSnapshot = await db
        .collection('coachpage_tenants')
        .where('status', '==', 'active')
        .where('whatsapp_notify_enabled', '==', true)
        .get();

      for (const tenantDoc of tenantsSnapshot.docs) {
        const tenantId = tenantDoc.id;
        const tenant = tenantDoc.data();

        const enquiriesSnapshot = await db
          .collection('coachpage_tenants')
          .doc(tenantId)
          .collection('enquiries')
          .where('followed_up_at', '>=', admin.firestore.Timestamp.fromDate(today))
          .where('followed_up_at', '<', admin.firestore.Timestamp.fromDate(new Date(today.getTime() + 86400000)))
          .get();

        if (enquiriesSnapshot.empty) continue;

        const count = enquiriesSnapshot.size;
        const message =
          `📋 Follow-up Reminder\n\n` +
          `You have ${count} follow-up${count > 1 ? 's' : ''} scheduled today.\n\n` +
          `Please check your enquiry dashboard to follow up with these leads.`;

        const encodedMsg = encodeURIComponent(message);
        const phone = (tenant.contact_phone || tenant.whatsapp_number || '').replace(/[^0-9]/g, '');

        if (phone) {
          const url =
            `https://api.callmebot.com/whatsapp.php` +
            `?phone=${phone}` +
            `&text=${encodedMsg}` +
            `&apikey=${tenant.callmebot_api_key || ''}`;

          await fetch(url);
        }
      }
    } catch (error) {
      console.error('Error in sendFollowUpReminders:', error);
    }
  });
