export default async function CopyrightFooter() {
  const year = new Date().getFullYear();

  return (
    <div className="bg-secondary">
      <div className="container mx-auto text-white py-4 space-y-2 text-xs flex md:flex-row flex-col-reverse text-center md:text-left md:justify-between md:items-center gap-2">
        <p className="lg:max-w-2xl max-w-lg">
          {" "}
          The product names & logos used on this website are for identification
          purposes only. All trademarks and registered trademarks are the
          property of their respective owners.
        </p>
        <p>© {year} Gamingty. All rights reserved.</p>
      </div>
    </div>
  );
}
