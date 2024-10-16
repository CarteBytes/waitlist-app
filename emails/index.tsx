import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Text,
} from "@react-email/components";
import * as React from "react";

interface EmailProps {
  userFirstname: string;
}

export const CarteBytesWaitlistEmail = ({ userFirstname }: EmailProps) => (
  <Html>
    <Head />
    <Preview>
      Thanks for Joining the CarteBytes Waitlist, {userFirstname}! 🎉
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={"/logo.svg"}
          width="220"
          height="100"
          alt="CarteBytes Logo"
          style={logo}
        />
        <Text style={greeting}>Hi {userFirstname},</Text>
        <Text style={paragraph}>
          Thanks for joining the waitlist for CarteBytes, where we're
          reimagining the way restaurants manage their digital menus! We're
          thrilled to have you on board.
        </Text>
        <Text style={paragraph}>
          We’ll keep you updated on our progress and let you know as soon as
          CarteBytes is ready for you to explore. In the meantime, if you have
          any questions or feedback, feel free to reply directly to{" "}
          <a href="mailto:hello@cartebytes.com" style={link}>
            this email
          </a>
          — we’d love to hear from you!
        </Text>
        <Text style={paragraph}>
          You can also follow us for updates on our journey:{" "}
          <a href="https://twitter.com/cartebytes" style={link}>
            @CarteBytes
          </a>
        </Text>
        <Text style={signOff}>
          Best regards,
          <br />
          The CarteBytes Team
        </Text>
        <Hr style={hr} />
        <Text style={footer}>
          You received this email because you signed up for the CarteBytes
          waitlist. If this was a mistake, feel free to ignore this email.
        </Text>
      </Container>
    </Body>
  </Html>
);

CarteBytesWaitlistEmail.PreviewProps = {
  userFirstname: "Allan",
} as EmailProps;

export default CarteBytesWaitlistEmail;

const main = {
  background: "linear-gradient(-225deg, #FFA07A 0%, #FF4500 48%, #FF6347 100%)",
  fontFamily: 'figtree, "Helvetica Neue", Helvetica, Arial, sans-serif',
  padding: "40px 0",
  color: "#ffffff",
};

const container = {
  margin: "0 auto",
  padding: "24px 32px 48px",
  backgroundColor: "#333333",
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  maxWidth: "600px",
};

const logo = {
  margin: "0 auto",
  paddingBottom: "20px",
};

const greeting = {
  fontSize: "18px",
  lineHeight: "28px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
  marginBottom: "20px",
};

const link = {
  color: "#FFD700",
  textDecoration: "underline",
};

const signOff = {
  fontSize: "16px",
  lineHeight: "26px",
  marginTop: "20px",
};

const hr = {
  borderColor: "#ffffff",
  margin: "20px 0",
};

const footer = {
  color: "#cccccc",
  fontSize: "12px",
};
