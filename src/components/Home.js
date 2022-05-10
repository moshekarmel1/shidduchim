import logo from "./../logo.svg";

function Home() {
    return (
        <div className="text-center">
            <img height="200" src={logo} className="App-logo" alt="logo" />
            <br />
            <br />
            <div className="row">
                <div className="col-md-12">
                    <p>
                        Yeshivish Shidduchim is a free online platform that
                        connects you with the best Jewish community in the
                        world.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Home;