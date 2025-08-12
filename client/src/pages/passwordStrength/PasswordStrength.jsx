import React, { useState } from "react";
import Title from "../../components/Title";
import FormInput from "../../components/FormInput";

const PasswordStrength = () => {
  const [pwd, setPwd] = useState("");

  const getPasswordStrength = (password) => {
    let score = 0;
    if (!password) return { label: "Too Short", color: "gray", score };

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) return { label: "Weak", color: "red", score };
    if (score === 3 || score === 4)
      return { label: "Moderate", color: "orange", score };
    if (score === 5) return { label: "Strong", color: "green", score };
  };

  const strength = getPasswordStrength(pwd);

  return (
    <div className="mt-4 mb-22 flex flex-col items-center gap-5 select-none sm:mt-22">
      <Title text="Password Strength Checker" />
      <div>
        <FormInput
          value={pwd}
          setValue={setPwd}
          label="Enter Password"
          type="text"
        />
      </div>
      {pwd && (
        <>
          <div>
            Strength:{" "}
            <span style={{ color: strength.color }} className="capitalize">
              {strength.label}
            </span>
          </div>
          <div className="h-2 w-72 rounded border">
            <div
              style={{
                width: `${Math.round(((strength?.score ?? 0) / 5) * 100)}%`,
              }}
              className={`h-full transition-all ${
                strength.score <= 2
                  ? "bg-gradient-to-r from-red-700 to-red-400"
                  : strength.score === 3 || strength.score === 4
                    ? "bg-gradient-to-r from-yellow-500 to-yellow-300"
                    : "bg-gradient-to-r from-green-500 to-green-300"
              }`}
            ></div>
          </div>
        </>
      )}

      <ul className="dark:text-primary list-disc">
        <span className="text-lg font-semibold">
          Suggestions for a strong password:
        </span>
        <li>Use at least 8 characters</li>
        <li>Include at least 1 number</li>
        <li>Include at least 1 uppercase letter</li>
        <li>Include at least 1 special character</li>
      </ul>
    </div>
  );
};

export default PasswordStrength;
