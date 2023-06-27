import React from 'react'

export default function Contact() {
  return (
    <div className='contact' id="contact-section">
        <div className='contactCard'>
            <div className='support'>
                <div className='contactTitle'>Contact Us</div>
                <div className='contactSubtitle'>We are here to help you</div>
                <div className='contactSubtitle'>Location : 31000 TOULOUSE</div>
                <div className='contactSubtitle'>Mail : support@dedicate.com</div>
                <div className='contactSubtitle'>tel : +334 456 789</div>

            </div>

            <div className='send'>
                <div>Send us a message : </div>
                <textarea></textarea>
                <div className="btnHome">Send</div>
            </div>
        </div>


    </div>
  )
}
