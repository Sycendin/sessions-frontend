import React from "react";
import { Fragment } from "react/cjs/react.production.min";


class Rank extends React.Component {
    constructor() {
        super();
        this.state = {
            emoji: ''
        }
    }
    componentDidMount(){
        this.generateEmoji(this.props.entries)
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.entries === this.props.entries &&
            prevProps.name === this.props.name){
            return null
        }
        else{
            this.generateEmojiLocal(this.props.entries);
            // Uses AWS
            // this.generateEmoji(this.props.entries)
        }
    }
    generateEmojiLocal = (entries) =>{
        const emojis = [
            '😗','😃','😊','😮','😎','🤑','🛹','🛸','🚀'
        ]
        const rankEmoji = emojis[entries >= emojis.length ? emojis.length-1 : entries]
        this.setState({emoji : rankEmoji})
    }
    generateEmoji = (entries) => {
        // Removed link so that no one can abuse the limit of requests
        // to have Amazon charge for it
        fetch(``)
        .then(response => response.json())
        .then(data => this.setState({emoji : data.input}))
        .catch(console.log)
    }
    render() {
    return (
        <Fragment>
        <div className="white f3"> 
        {`${this.props.name}, your current entry count is: `}
        </div>  
        <div className="white f1"> 
            {`${this.props.entries} `}
        </div>  
        <div className="white f3"> 
            {`Rank Badge: ${this.state.emoji} `}
        </div> 
        </Fragment>
        );
    }
}
    

export default Rank;