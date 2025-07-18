// components/Footer.tsx
const Footer = () => {
  const today = new Date();
  const formatted = today.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <footer className="text-center text-sm py-3">
      Today&apos;s Date: {formatted}
    </footer>
  );
};

export default Footer;
