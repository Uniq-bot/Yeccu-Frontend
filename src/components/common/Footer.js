import './Footer.css';
import React, { useState } from 'react';
function Footer(){
    return(
        <footer className="footer"> 
            <div className="footer-container">
                <div className="footersection-left">
                    <h2 className="yecculogo">YECCU <span>BASKETBALL</span></h2>
                    <p className='moto'>Empowering young ballers through premium gear and world-class training.</p>
                    <div className="socialmedia-icon">
                        <a href="www.facebook.com"><img src="" alt="" /><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="black" stroke="#FFD700" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-facebook-icon lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
                        <a href="www.instagram.com"><img src="instalogo" alt="" /><svg className='instagram-logo' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFD700" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-instagram-icon lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg></a>
                        <a href="www.twitter.com"><img src="twitterlogo" alt="" /><svg className='twitter-logo' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFD700" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-twitter-icon lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg></a>
                        <a href="www.youtube.com"><img src="youtubelogo" alt="" /><svg className='youtube-logo' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFD700" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-youtube-icon lucide-youtube"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg></a>
                    </div>
                </div>
                <div className="footersection-middle">
                    <h3 className='footer-header'>Quick Links</h3>
                    <div className="quicklinks">
                        <a href="./About">HOME</a>
                        <a href="./Products">PRODUCTS</a>
                        <a href="./Blog">BLOG</a>
                        <a href="./Contact">CONTACT</a>

                    </div>
                       
                </div>
                <div className="footersection-right">
                    <h3 className='footer-header get-in-touch' > GET IN TOUCH</h3>
                    <div className="get-in-touch-content">
                        <p>Email:info@yeccubasketball.com</p>   
                        <p>Phone:+1(555)123-4567</p>
                        <p>Address:123 Court St,Basketball City</p>
                    </div>
                        
                </div>
                
                
            </div>
            <div className='footer-copyright'>
                    <p>
                        © {new Date().getFullYear()} YECCU Basketball. All rights reserved. Built for champions.
                    </p>
            </div>

        </footer>
    )
}

export default Footer;