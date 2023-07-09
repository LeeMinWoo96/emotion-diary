const MyButton = ({text, type, onClick}) =>{
    // posi, neg 중 없으면 강제로 def 로
    const btnType = ['positive','negative'].includes(type)?type:'default';
    return (
        <button className={["MyButton",`MyButton_${btnType}`].join(" ")} onClick={onClick}>
            {text}
        </button>
    );
}

MyButton.defaultProps = {
    type : "default",
};


export default MyButton;