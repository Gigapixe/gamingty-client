import FooterLinks from "./FooterLinks";
import Newsletter from "./Newsletter";

export default function Footer() {
  return (
    <footer className="bg-primary/10 dark:bg-primary-dark/10">
      <Newsletter />
      <FooterLinks />
    </footer>
  );
}
