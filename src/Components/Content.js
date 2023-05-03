import React, { useRef, useState } from 'react'
import "./Content.css"

const Content = () => {
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const otpInputs = useRef([]);

    const handleInputChange = (index, event) => {
        const value = event.target.value;
        if (isNaN(value)) {
            return;
        }

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value) {
            if (index === otpInputs.current.length - 1) {
                otpInputs.current[index].blur();
            } else {
                otpInputs.current[index + 1].focus();
            }
        } else if (index !== 0) {
            otpInputs.current[index - 1].focus();
        }
    };


    const handlePaste = (event) => {
        event.preventDefault();
        const pasteData = event.clipboardData.getData("text/plain");
        const newOtp = [...otp];
        for (let i = 0; i < pasteData.length && i < otpInputs.current.length; i++) {
            if (!isNaN(pasteData[i])) {
                newOtp[i] = pasteData[i];
            }
        }
        setOtp(newOtp);
    };

    const handelAlert = () => {
        alert("OTP Verified");
    };

    return (
        <>
            <div className='content'>
                <div className="container">
                    <div className='title'>Phone Verification</div>
                    <div className='heading'>
                        Enter the OTP you recived on 86XXX-XXX83
                    </div>
                    <div className='box'>
                        {
                            otp.map((item, index) => {
                                return (
                                    <input
                                        className="otp"
                                        type='number'
                                        key={index}
                                        value={item}
                                        maxLength="1"
                                        pattern="[0-9]"
                                        ref={(el) => (otpInputs.current[index] = el)}
                                        onChange={(event) => handleInputChange(index, event)}
                                        onPaste={handlePaste}
                                    />
                                )
                            })
                        }
                    </div>
                    <div className='msg'>
                        <h6>Change Number</h6>
                        <h6>Resend OTP</h6>
                    </div>
                    <div className='button'>
                        <button className="btn" onClick={handelAlert}>Verify OTP</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Content