import Sidebar from "../../Components/Sidebar";
import { Container} from "react-bootstrap";

function name() {

  return (
    <div style={{ display: "flex" }}>
      <div>
        <Sidebar />
      </div>

      <div
        fluid
        className="vh-100 d-flex "
        style={{ width: "100%", marginTop: "100px" }}
      >
        <Container>
        </Container>

      </div>
    </div>
  );
}

export default name ;

