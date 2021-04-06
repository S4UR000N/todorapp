import React from "react"

function Image(props) {
    return (
        <section className="memeCon">
            <span className="memeHol">
                <h2>Fetch Rand Meme</h2>
                {props.url
                 ?
                    <img id="meme" alt="random meme" src={props.url} />
                 :
                    null
                }
            </span>
        </section>
    )
}

export default Image
