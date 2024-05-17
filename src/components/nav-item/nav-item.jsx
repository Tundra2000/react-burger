

export default function NavItem(){

    return(
        <>
        <button src={this.props.image}>
            {this.props.text}
        </button>
        </>
    );
}