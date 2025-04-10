"use client"

import { useRouter } from "next/navigation";

export default function Home() {
  const { push } = useRouter();

  function btnLoginCLick() {
    push("/create");
  }

  return (
    <>
      <div className="container px-4 py-5">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-6">
            <img src="https://resizer.iproimg.com/unsafe/1280x/filters:format(webp):quality(85)/https://assets.iprofesional.com/assets/jpg/2013/11/389680.jpg" className="d-block mx-lg-auto img-fluid" width="700" height="500" />
          </div>
          <div className="col-6">
            <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">Donate Crypto</h1>
            <p className="lead">Sua plataforma descentralizada de doações.</p>
            <p className="lead">Autentique-se com sua carteira e crie sua campanha.</p>
            <p className="lead mb-3">Para doações, use o link da campanha já existente.</p>
            <div className="d-flex justify-content-center mt-5">
              <button type="button" className="btn btn-primary btn-lg px-4 me-2 col-12" onClick={btnLoginCLick}>
                <img src="/metamask.svg" width="64" className="me-2" />
                Conectar com a Metamask
              </button>
            </div>
            <div className="alert alert-success p-3 col-12 mt-3" role="alert">Usuário autenticado com sucesso!</div>
          </div>
        </div>
      </div>
    </>
  );
}
