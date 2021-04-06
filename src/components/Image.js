import React from "react"

function Image(props) {
    return (
        <section className="memeCon">
            <span className="memeHol">
                <h2>Fetch Rand Meme</h2>
                {props.state.url
                 ?
                    <img id="meme" src={props.state.url} />
                 :
                    null
                }
            </span>
        </section>
    )
}

export default Image
