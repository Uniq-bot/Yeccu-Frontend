import React from 'react'

const ContactForm = () => {
  return (
    <div className="w-full  bg-black border-amber-300/20 text-[#D8971F] shadow-lg p-6 flex flex-col">
      <h1 className="text-3xl font-bold  mb-6">
        Send us a message
      </h1>

      <form className="flex flex-col gap-5">
        
        {/* Name */}
        <div className="flex flex-col">
          <label className="text-sm  uppercase mb-1">
            Your Name
          </label>
          <input
            type="text"
            placeholder='John Doe'
            className="border border-amber-300/20 px-4 py-2 focus:outline-none focus:ring-1"
            required
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="text-sm  uppercase  mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder='johndoe@gmail.com'
            autoComplete="email"
            className="border border-amber-300/20 px-4 py-2 focus:outline-none "
            required
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col">
          <label className="text-sm  uppercase  mb-1">
            Phone
          </label>
          <input
            type="tel"
            placeholder='(+977) 120210200'
            autoComplete="tel"
            className="border border-amber-300/20 px-4 py-2 focus:outline-none "
            required
          />
        </div>

        {/* Message */}
        <div className="flex flex-col">
          <label className="text-sm  uppercase  mb-1">
            Message
          </label>
          <textarea
            rows="5"
            placeholder='Tell me about your basketball goals...'
            className="border border-amber-300/20 px-4 py-2 resize-none focus:outline-none "
          ></textarea>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="bg-[#D8971F]/60 hover:bg-[#D8971F] text-black  font-extrabold py-3 transition duration-300"
        >
          Send Message
        </button>
      </form>
    </div>
  )
}

export default ContactForm
