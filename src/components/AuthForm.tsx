'use client';

import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface User {
  username: string;
  password: string;
  confirm?: string;
}

interface PasswordVisibility {
  password: boolean;
  confirm: boolean;
}

const initialState: User = {
  username: '',
  password: '',
  confirm: ''
};

export default function AuthForm({ type }: { type: 'login' | 'signup' }) {
  const [user, setUser] = useState<User>(initialState);
  const [errors, setErrors] = useState<string[]>([]);
  const [visibility, setVisibility] = useState<PasswordVisibility>({
    password: false,
    confirm: false
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUser((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value
      };
    });
  }

  function handleVisibility(e: React.MouseEvent<HTMLDivElement>) {
    const name = e.currentTarget.getAttribute('data-name');

    if (name && name in visibility) {
      setVisibility((prevState) => {
        return {
          ...prevState,
          [name]: !prevState[name as keyof PasswordVisibility]
        };
      });
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors([]);

    if (type === 'signup' && user.password !== user.confirm) {
      return setErrors((prevState) => [
        ...prevState,
        "Passwords doesn't match"
      ]);
    }

    console.log(user);
  }

  return (
    <form
      className="w-full max-w-xs border-4 border-double border-foreground p-8 flex flex-col items-center justify-center gap-4"
      onSubmit={handleSubmit}
    >
      <h1 className="text-3xl capitalize">{type}</h1>
      <div className="w-full flex flex-col">
        <label className="text-lg">Username</label>
        <input
          className="border-4 border-double border-foreground bg-background px-4 py-2 outline-none"
          type="text"
          onChange={handleChange}
          value={user.username}
          name="username"
          placeholder="Username..."
        />
      </div>
      <div className="relative w-full flex flex-col">
        <label className="text-lg">Password</label>
        <input
          className="border-4 border-double border-foreground bg-background pl-4 pr-10 py-2 outline-none"
          type={visibility.password ? 'text' : 'password'}
          onChange={handleChange}
          value={user.password}
          name="password"
          placeholder="Password..."
        />
        <div
          className="absolute bottom-4 right-4 cursor-pointer"
          data-name="password"
          onClick={handleVisibility}
        >
          {visibility.password ? <FaEyeSlash /> : <FaEye />}
        </div>
      </div>
      {type === 'signup' && (
        <div className="relative w-full flex flex-col">
          <label className="text-lg">Confirm Password</label>
          <input
            className="border-4 border-double border-foreground bg-background pl-4 pr-10 py-2 outline-none"
            type={visibility.confirm ? 'text' : 'password'}
            onChange={handleChange}
            value={user.confirm}
            name="confirm"
            placeholder="Confirm..."
          />
          <div
            className="absolute bottom-4 right-4 cursor-pointer"
            data-name="confirm"
            onClick={handleVisibility}
          >
            {visibility.confirm ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>
      )}
      {errors.length > 0 && (
        <ul>
          {errors.map((error, i) => (
            <li className="list-disc text-redhaus" key={i}>
              {error}
            </li>
          ))}
        </ul>
      )}
      <button className="w-full mt-4 border-4 border-double border-foreground bg-background px-4 py-2 text-xl hover:border-background hover:bg-foreground hover:text-background hover:font-bold">
        Enter
      </button>
    </form>
  );
}