import "bootstrap/dist/css/bootstrap.min.css";

export const metadata = {
  title: "Ticketing test",
  description: "Udemy microservices course",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
