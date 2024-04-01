export default function Spotify({ data }) {
  return (
    <div>
      <img src={data.album_art_url} width={100} height={100} alt={data.album} />
      <pre>
        {data.artist.replace(/;/g, ",")} - {data.song}
      </pre>
    </div>
  );
}
