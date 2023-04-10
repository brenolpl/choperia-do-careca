package com.ifes.backend.services;

import com.ifes.backend.common.IMailMessage;
import com.ifes.backend.dto.Anexo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Properties;
import javax.mail.Address;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.InputStream;
import java.io.ByteArrayInputStream;
import javax.mail.Multipart;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMultipart;

@Service
public class MailMessage implements IMailMessage {

    @Override
    public void sendMessage(String subject, String body, String[] to, String[] cc, String[] cco, List<Anexo> anexos) {
        Properties props = new Properties();
        Session session = Session.getDefaultInstance(props, null);

        try {
            Message msg = new MimeMessage(session);
            msg.setFrom(new InternetAddress("brenoluizleal@gmail.com"));


            msg.setSubject(subject);
            msg.setText(body);
            msg.setRecipients(Message.RecipientType.TO, getRecipients(to));
            msg.setRecipients(Message.RecipientType.CC, getRecipients(cc));
            msg.setRecipients(Message.RecipientType.BCC, getRecipients(cco));

            Multipart mp = new MimeMultipart();

            for(Anexo a : anexos) {
                MimeBodyPart attachment = new MimeBodyPart();
                InputStream attachmentDataStream = new ByteArrayInputStream(a.getData());
                attachment.setFileName(a.getNomeDoc());
                attachment.setContent(attachmentDataStream, "application/pdf");
                mp.addBodyPart(attachment);
            }
            msg.setContent(mp);

            Transport.send(msg);

        } catch (AddressException e) {
            e.printStackTrace();
            throw new RuntimeException("Erro ao enviar e-mail", e);
        } catch (MessagingException e) {
            e.printStackTrace();
            throw new RuntimeException("Erro ao enviar e-mail", e);
        }
    }

    private Address[] getRecipients(String[] recipients) throws AddressException {
        Address[] toAddresses = new Address[recipients.length];
        for (int i = 0; i < recipients.length; i++) {
            toAddresses[i] = new InternetAddress(recipients[i]);
        }

        return toAddresses;
    }
}
