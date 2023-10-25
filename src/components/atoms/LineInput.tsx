import { HTMLAttributes, useState } from "react";
import classNames from "classnames";
import eye from '../../assets/eye-show.svg';
import closeEye from '../../assets/eye-closed.svg';

interface IProps extends HTMLAttributes<HTMLInputElement> {
  value: string,
  error?: string,
  isPassword?: true,
  handleInput: (value: string) => void
}

export const LineInput = (props: IProps) => {
  const { isPassword, value, error, placeholder, handleInput } = props

  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="w-full relative">
      <input
        className={classNames(
          'pl-2 w-full bg-melrose-50 border-b-2 outline-none text-lg tracking-wide text-melrose-800',
          'placeholder:text-slate-400 placeholder:text-base placeholder:tracking-wider',
          `${error ? 'border-red-400' : 'border-melrose-300'}`
        )}
        type={!showPassword && isPassword ? 'password' : 'text'}
        value={value}
        onChange={(e) => handleInput(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
      />

      <p className="text-sm text-red-400">{error}</p>

      {isPassword && (
        <img
          className="absolute right-0 top-2"
          src={showPassword ? eye : closeEye}
          onMouseDown={() => setShowPassword(true)}
          onMouseUp={() => setShowPassword(false)}
          onMouseLeave={() => setShowPassword(false)}
        />
      )}
    </div>
  )
}
