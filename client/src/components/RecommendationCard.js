// File: /client/src/components/RecommendationCard.jsx
export default function RecommendationCard({ card }) {
  return (
    <div className="card mb-4 shadow-sm border-0 rounded-4 overflow-hidden">
      <div className="row g-0">
        <div className="col-md-4 d-flex align-items-center justify-content-center p-3 bg-light">
          <img
            src={card.imageUrl}
            alt={card.name}
            className="img-fluid rounded"
            style={{ maxHeight: '120px', maxWidth: '100%' }}
            onError={(e) => (e.target.src = 'https://via.placeholder.com/150x90.png?text=Card')}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body py-3 px-4">
            <h5 className="card-title text-primary fw-bold">{card.name}</h5>
            {card.keyReasons && (
              <ul className="text-muted small ps-3 mb-2">
                {card.keyReasons.map((reason, idx) => (
                  <li key={idx}>{reason}</li>
                ))}
              </ul>
            )}
            {card.rewardSimulation && (
              <p className="card-text mb-2">
                <small className="text-success fw-medium">
                  Estimated Annual Reward: ₹{card.rewardSimulation.totalRewards || '0'}
                </small>
              </p>
            )}
            <a
              href={card.applyLink}
              className="btn btn-outline-primary btn-sm rounded-pill px-3"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              Apply Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}