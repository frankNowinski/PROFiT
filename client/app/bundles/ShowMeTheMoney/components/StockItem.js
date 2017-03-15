import React from 'react';

export default function StockList(props) {
  const { id, ticker, shares, purchased_date, purchased_price } = props.stock.toObject()

  const formatUniqueId = (hashtag) => {
   return hashtag ? `#stock-container-${id}` : `stock-container-${id}`
  }

  return (
    <div className="card">
      <div className="card-header" role="tab" id="headingOne">
        <h5 className="mb-0">
          <p className="lead"
             data-toggle="collapse"
             data-parent="#accordion"
             href={formatUniqueId(true)}
             aria-expanded="true"
             aria-controls={formatUniqueId()}>
            {ticker.toUpperCase()}
          </p>
        </h5>
      </div>

       <div id={formatUniqueId()} className="collapse show" role="tabpanel" aria-labelledby="headingOne">
        <div className="card-block">
          Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
        </div>
      </div>
    </div>
  )
}
