export function ToyPreview({ toy }) {
    return <div className="toy" style={{ backgroundColor: toy.color }}>
        <h3 className={toy.isStock ? 'in-stock' : ''}>{toy.name}</h3>
        <h4>{toy.price}</h4>
    </div>

}