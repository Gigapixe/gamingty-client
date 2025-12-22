import React, {
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  useId,
} from "react";

export type OtpInputProps = {
  length?: number;
  value?: string; // controlled value (digits only)
  onChange?: (value: string) => void;
  autoFocus?: boolean;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
  name?: string;
  label?: string;
  labelClassName?: string;
  labelSrOnly?: boolean;
};

export type OtpInputHandle = {
  focus: () => void;
  clear: () => void;
};

/**
 * Reusable OTP input component
 * - Supports paste, auto-advance, backspace navigation
 * - Controlled via `value` + `onChange` or uncontrolled (internal state)
 */
const OtpInput = React.forwardRef<OtpInputHandle, OtpInputProps>(
  (
    {
      length = 6,
      value,
      onChange,
      autoFocus = false,
      disabled = false,
      className = "",
      inputClassName = "w-10 h-12 md:w-12 md:h-14 text-center text-xl font-semibold bg-white dark:bg-[#1F1F1F] border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors",
      name,
      label,
      labelClassName = "text-sm text-gray-600 dark:text-gray-400 mb-2",
      labelSrOnly = false,
    },
    ref
  ) => {
    const [internal, setInternal] = useState<string>(value ?? "");
    const isControlled = typeof value !== "undefined";
    const current = isControlled ? value! : internal;

    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
    const id = useId();

    useEffect(() => {
      if (isControlled) return;
      // keep internal length trimmed
      setInternal((v) => v.slice(0, length));
    }, [length]);

    useEffect(() => {
      if (isControlled) return;
      if (autoFocus) inputsRef.current[0]?.focus();
    }, [autoFocus, isControlled]);

    useEffect(() => {
      if (isControlled) return;
      setInternal("");
    }, [disabled]);

    useEffect(() => {
      // sync controlled prop to internal when prop changes
      if (isControlled) return;
    }, [value]);

    useImperativeHandle(ref, () => ({
      focus: () => inputsRef.current[0]?.focus(),
      clear: () => {
        if (isControlled) onChange?.("");
        else setInternal("");
      },
    }));

    const updateValueAt = (index: number, digit: string) => {
      const arr = current.split("").slice(0, length);
      while (arr.length < length) arr.push("");
      arr[index] = digit;
      const newVal = arr.join("");
      if (isControlled) onChange?.(newVal);
      else setInternal(newVal);
    };

    const handleChange = (index: number, raw: string) => {
      if (disabled) return;
      const digit = raw.replace(/[^0-9]/g, "").slice(-1);
      if (!digit) {
        updateValueAt(index, "");
        return;
      }
      updateValueAt(index, digit);
      // focus next
      if (index < length - 1) {
        inputsRef.current[index + 1]?.focus();
      }
    };

    const handleKeyDown = (
      index: number,
      e: React.KeyboardEvent<HTMLInputElement>
    ) => {
      if (e.key === "Backspace") {
        // if current has value, clear it; otherwise go to previous
        const arr = current.split("");
        if ((arr[index] ?? "") !== "") {
          updateValueAt(index, "");
        } else if (index > 0) {
          inputsRef.current[index - 1]?.focus();
          updateValueAt(index - 1, "");
        }
      } else if (e.key === "ArrowLeft" && index > 0) {
        inputsRef.current[index - 1]?.focus();
      } else if (e.key === "ArrowRight" && index < length - 1) {
        inputsRef.current[index + 1]?.focus();
      }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      if (disabled) return;
      const pasted = e.clipboardData
        .getData("text")
        .replace(/[^0-9]/g, "")
        .slice(0, length);
      if (!pasted) return;
      const arr = pasted.split("");
      const full = arr.concat(Array(length - arr.length).fill(""));
      const newVal = full.slice(0, length).join("");
      if (isControlled) onChange?.(newVal);
      else setInternal(newVal);
      // focus next empty or last
      const nextIndex = Math.min(arr.length, length - 1);
      inputsRef.current[nextIndex]?.focus();
    };

    const renderInputs = () => {
      const arr = current.split("");
      while (arr.length < length) arr.push("");

      return arr.map((digit, i) => (
        <input
          key={i}
          name={name ? `${name}-${i}` : undefined}
          id={`${id}-${i}`}
          ref={(el) => {
            inputsRef.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={i === 0 ? handlePaste : undefined}
          disabled={disabled}
          aria-label={`Digit ${i + 1} of ${length}`}
          className={inputClassName}
        />
      ));
    };

    return (
      <div className={`${className} flex flex-col items-start gap-3`}>
        {label && (
          <label
            htmlFor={`${id}-0`}
            className={`${labelSrOnly ? "sr-only" : ""}${labelClassName}`}
          >
            {label}
          </label>
        )}
        <div className="flex items-center gap-2">{renderInputs()}</div>
      </div>
    );
  }
);

OtpInput.displayName = "OtpInput";

export default OtpInput;
