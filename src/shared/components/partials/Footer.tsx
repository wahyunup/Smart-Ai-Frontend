const Footer = () => {
  return (
    <div className="py-10 flex flex-col items-center  justify-between gap-10 bg-white text-manrope">
      <div className="flex justify-evenly w-full">
        <div className="flex flex-col gap-5 text-start">
          <h1 className="font-bold text-[16px]">Navigation</h1>
          <div className="flex flex-col">
            <a href="">Home</a>
            <a href="">Who We Are</a>
            <a href="">Feature</a>
            <a href="">How It Works</a>
          </div>
        </div>

        <div className="flex flex-col gap-5 text-start">
          <h1 className="font-bold text-[16px]">Resources</h1>
          <div className="flex flex-col">
            <a href="">Documentation</a>
            <a href="">API Reference</a>
            <a href="">Privacy Policy</a>
            <a href="">Terms & Conditions</a>
          </div>
        </div>

        <div className="flex flex-col gap-5 text-start">
          <h1 className="font-bold text-[16px]">Get in Touch</h1>
          <div className="flex flex-col">
            <a href="">Tangerang, Indonesia</a>
            <a href="">hello@smartai.id</a>
            <a href="">+62 812 3456 7890</a>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center mt-5">
        <img className="w-50 h-fit" src="/public/logo-footer.png" alt="" />
        <p className="text-[16px]">Your Intelligent Assistant for Company Knowledge.</p>
      </div>

      <div>
        <p className="text-center text-[#B2B2B2]">
          © 2025 SmartAI. All rights reserved.<br />Built with ❤️ and AI for a smarter world.
        </p>
      </div>
    </div>
  );
};

export default Footer;
