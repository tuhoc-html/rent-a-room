const Button1 = ({ children , variant = 'primary', className = '' }) => {
  const baseStyle = "px-5 py-2.5 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2";
  const variants : Record<string, string> = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20",
    ghost: "text-slate-600 hover:bg-slate-100",
    outline: "border border-slate-200 text-slate-600 hover:border-blue-600 hover:text-blue-600"
  };
  
  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

export default Button1;