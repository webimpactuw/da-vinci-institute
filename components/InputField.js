export default function InputField({ label, type, id, name, placeholder, onChange }) {
  return (
    <div className="w-3/4">
      <label className="block font-semibold" htmlFor={id}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        className="p-3 bg-[#003c54] text-white w-full"
        onChange={onChange}
      />
    </div>
  );
}