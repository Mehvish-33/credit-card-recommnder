// File: /client/src/components/RecommendationCard.jsx
export default function RecommendationCard({ card }) {
  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-4 d-flex align-items-center justify-content-center p-3">
          <img src={card.imageUrl} className="img-fluid" alt={card.name} />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{card.name}</h5>
            <p className="card-text">{card.keyReasons?.join(', ')}</p>
            <p className="card-text"><small className="text-muted">{card.rewardSimulation}</small></p>
            <a href={card.applyLink} className="btn btn-outline-primary">Apply</a>
          </div>
        </div>
      </div>
    </div>
  );
}
