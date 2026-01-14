import React from "react";

function Detail() {
  return (
    <div className=" py-3 px-2 flex flex-col gap-5 justify-between ">
      <div className="bg-yellow-400 text-black flex flex-col py-5 px-3">
        <h1 className="text-2xl font-extrabold">QUICK RESPONSE</h1>
        <p className="text[6px] leading-0 py-2">
          Get instant answers on WhatsApp
        </p>
        <h2 className="mt-5 px-5 py-3 text-center bg-black text-yellow-400 text-xs font-bold">CHAT ON WHATSAPP</h2>
      </div>

      <div className="bg-gray-900 text-white flex flex-col gap-4 py-5 px-3 border border-gray-700">
        <h1 className="text-2xl font-extrabold text-yellow-400">CONTACT INFO</h1>
        <div className="flex flex-col gap-1">
          <h2 className="text-sm font-bold text-yellow-400">EMAIL</h2>
          <p className="text-gray-300 text-sm">yeccuofficial@gmail.com</p>
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-sm font-bold text-yellow-400">PHONE</h2>
          <p className="text-gray-300 text-sm">
            +1 (555) 123-4567 <br />
            +1 (555)987-6543
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-sm font-bold text-yellow-400">LOCATION</h2>
          <p className="text-gray-300 text-sm">Basundhara, Kathmandu</p>
        </div>
      </div>

      <div className="bg-black text-yellow-600/70 flex flex-col gap-5 py-5 px-3 border border-amber-300">
        <h1 className="text-2xl font-extrabold text-white ">TRAINING HOURS</h1>
        <div>
          <p className="flex gap-10 text-white">Sunday-Monday <span className="text-yellow-400">4:30 P.M - 6:30P.M</span></p>
          <p className="flex gap-10 text-white">Sunday-Monday <span className="text-yellow-400">4:30 P.M - 6:30P.M</span></p>
        </div>
      </div>
    </div>
  );
}

export default Detail;
