import Footer from "@/components/shared/footer/Footer";
import Header from "@/components/shared/header/Header";

export default function GroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
