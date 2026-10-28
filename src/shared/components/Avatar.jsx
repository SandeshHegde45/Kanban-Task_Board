const tiles = ["bg-[#6b7de8]", "bg-[#e8a317]", "bg-[#2fae74]", "bg-[#f0647a]", "bg-[#3aa7e0]", "bg-[#9a6bf0]"];

// Same user, same colour, everywhere.
const tileFor = (id) => tiles[[...id].reduce((sum, ch) => sum + ch.charCodeAt(0), 0) % tiles.length];

export default function Avatar({ user, className = "size-9 text-sm" }) {
  return (
    <span title={user.name} className={`grid shrink-0 place-items-center rounded-full font-display font-extrabold text-white ${tileFor(user.id)} ${className}`}>
      {user.name.charAt(0).toUpperCase()}
    </span>
  );
}
