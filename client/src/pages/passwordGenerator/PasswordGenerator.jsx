import React, { useState } from "react";
import Title from "../../components/Title";
import Button from "../../components/Button";
import generator from "generate-password-browser";
import FormInput from "../../components/FormInput";
import { FaCopy } from "react-icons/fa6";
import { toast } from "sonner";

const PasswordGenerator = () => {
  const [pwd, setPwd] = useState("");
  const [pwdLength, setPwdLength] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [symbol, setSymbol] = useState(false);
  const [number, setNumber] = useState(false);

  console.log(symbol);

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
        numbers: number,
        symbols: symbol,
      });
      setPwd(tempPwd);
    }, 100);

    // Stop after given time (600ms) and show final password
    setTimeout(() => {
      clearInterval(intervalId);
      try {
        const finalPwd = generator.generate({
          length: Number(pwdLength),
          numbers: number,
          symbols: symbol,
        });
        setPwd(finalPwd);
      } catch (error) {
        console.error("Password generation failed:", error);
        setPwd("Error generating password");
      } finally {
        setIsGenerating(false);
      }
    }, 600);
  };

  const copyPwd = () => {
    const copyPromise = new Promise(async (resolve, reject) => {
      try {
        await navigator.clipboard.writeText(pwd);
        resolve();
      } catch (err) {
        reject("Error copying password:");
      }
    });

    toast.promise(copyPromise, {
      loading: "Copying Password...",
      success: "Password Copied Successfully!",
      error: (errMsg) => errMsg,
    });

    return copyPromise;
  };

  return (
    <div className="mt-4 mb-22 flex flex-col items-center gap-5 select-none sm:mt-22">
      <Title text="Password Generator" />
      <div>
        <FormInput
          value={pwdLength}
          setValue={setPwdLength}
          label="Password Length"
          type="number"
        />
      </div>
      <div className="flex gap-3 *:flex *:items-center *:gap-2">
        <section>
          <label htmlFor="number">Numbers</label>
          <input
            onChange={(e) => setNumber(e.target.checked)}
            checked={number}
            className="h-5 w-5 accent-[#F05454]"
            type="checkbox"
            id="number"
          />
        </section>
        <section>
          <label htmlFor="symbol">Symbols</label>
          <input
            onChange={(e) => setSymbol(e.target.checked)}
            checked={symbol}
            className="h-5 w-5 accent-[#F05454]"
            type="checkbox"
            id="symbol"
          />
        </section>
      </div>
      {pwd && (
        <div className="flex max-w-[80%] items-center gap-2 select-text">
          <span className="relative rounded-lg bg-white px-6 py-3 text-center font-mono text-lg break-all shadow-md">
            {pwd}
            <FaCopy
              onClick={copyPwd}
              className="absolute top-0 -right-8 cursor-pointer text-2xl"
            />
          </span>
        </div>
      )}
      <Button
        text={isGenerating ? "Generating..." : "Generate Password"}
        action={generatePassword}
        disabled={isGenerating}
      />
    </div>
  );
};

export default PasswordGenerator;
