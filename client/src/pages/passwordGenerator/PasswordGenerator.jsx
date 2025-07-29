import React, { useState } from "react";
import Title from "../../components/Title";
import Button from "../../components/Button";
import generator from "generate-password-browser";
import FormInput from "../../components/FormInput";

const PasswordGenerator = () => {
  const [pwd, setPwd] = useState("");
  const [pwdLength, setPwdLength] = useState();
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePassword = () => {
    if (!pwdLength || pwdLength < 1) {
      setPwd("Enter a valid length");
      return;
    }

    setIsGenerating(true);
    let intervalId;

    // Generate random password rapidly every 100ms
    intervalId = setInterval(() => {
      const tempPwd = generator.generate({
        length: Number(pwdLength),
        numbers: true,
      });
      setPwd(tempPwd);
    }, 100);

    // Stop after 1.5 seconds and show final password
    setTimeout(() => {
      clearInterval(intervalId);
      try {
        const finalPwd = generator.generate({
          length: Number(pwdLength),
          numbers: true,
        });
        setPwd(finalPwd);
      } catch (error) {
        console.error("Password generation failed:", error);
        setPwd("Error generating password");
      } finally {
        setIsGenerating(false);
      }
    }, 500);
  };

  return (
    <div className="mt-4 mb-22 flex flex-col items-center gap-3">
      <Title text="Password Generator" />
      <div>
        <FormInput
          value={pwdLength}
          setValue={setPwdLength}
          label="Password Length"
          type="number"
        />
      </div>
      <span className="px-20 text-center font-mono text-lg break-all">
        {pwd}
      </span>
      <Button
        text={isGenerating ? "Generating..." : "Generate Password"}
        action={generatePassword}
        disabled={isGenerating}
      />
    </div>
  );
};

export default PasswordGenerator;
