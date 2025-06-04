const consents = [
    { nome: "Ana Monteiro", email: "ana.monteiro@gmail.com", consentirUm: false, consentirDois: true, consentirTres: true },
    { nome: "Carlos Lima", email: "carlos.lima@yahoo.com", consentirUm: true, consentirDois: false, consentirTres: true },
    { nome: "Mariana Souza", email: "mariana.souza@outlook.com", consentirUm: true, consentirDois: true, consentirTres: false },
    { nome: "João Pereira", email: "joao.pereira@gmail.com", consentirUm: false, consentirDois: true, consentirTres: true },
    { nome: "Fernanda Costa", email: "fernanda.costa@hotmail.com", consentirUm: true, consentirDois: false, consentirTres: true },
    { nome: "Lucas Andrade", email: "lucas.andrade@empresa.com", consentirUm: true, consentirDois: true, consentirTres: false },
    { nome: "Paula Dias", email: "paula.dias@gmail.com", consentirUm: false, consentirDois: true, consentirTres: false },
    { nome: "Rafael Mendes", email: "rafael.mendes@protonmail.com", consentirUm: true, consentirDois: false, consentirTres: true }
  ];
  
function formatarResposta(valor:any){
    if (valor.valorConsentimento === undefined) {
        valor.valorConsentimento = "";
        if (valor.consentirUm) {
            valor.valorConsentimento !== "" ? 
                valor.valorConsentimento = valor.valorConsentimento.concat(", Recieve Newsletter") : 
                valor.valorConsentimento = valor.valorConsentimento.concat("Recieve Newsletter")
        }
        if (valor.consentirDois) {
            valor.valorConsentimento !== "" ? 
                valor.valorConsentimento = valor.valorConsentimento.concat(", Be shown targets ads") : 
                valor.valorConsentimento = valor.valorConsentimento.concat("Be shown targets ads")
        }
        if (valor.consentirTres) {
            valor.valorConsentimento !== "" ? 
                valor.valorConsentimento = valor.valorConsentimento.concat(", Contribute to anonymous visit statistics") : 
                valor.valorConsentimento = valor.valorConsentimento.concat("Contribute to anonymous visit statistics")
        }
    }
    
  }

  export function setupFetchMock() {
    const originalFetch = window.fetch;
  
    window.fetch = function (input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
      const url = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url;
        consents.forEach((obj) => {formatarResposta(obj)});
      if (url.endsWith('/consents')) {
        if (!init || init.method === 'GET') {
          return Promise.resolve(new Response(JSON.stringify({
            data: consents,
            pagination: { total: consents.length }
          }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          }));
        }
  
        if (init.method === 'POST') {
          return new Promise((resolve) => {
            const reader = new Response(init.body).json().then(body => {
                const jaExiste = consents.some(c => c.email === body.email);

                if (jaExiste) {
                    resolve(new Response(JSON.stringify({ message: 'Consentimento já existe.' }), {
                        status: 409, 
                        headers: { 'Content-Type': 'application/json' }
                    }));
                } else {
                    formatarResposta(body)
                    const novo = { ...body };
                    consents.push(novo);
                    resolve(new Response(JSON.stringify(novo), {
                      status: 201,
                      headers: { 'Content-Type': 'application/json' }
                    }));
                }
            });
          });
        }
      }
  
      return originalFetch(input, init); // fallback
    };
  }