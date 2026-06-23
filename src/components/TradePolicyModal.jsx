export default function TradePolicyModal({ onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-2xl text-ink font-light">
            Política de Troca e Devolução
          </h2>
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="text-ink-soft hover:text-rose transition-colors text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="font-sans text-sm text-ink-soft space-y-5">
          <p>
            Na Doce Essência, prezamos pela qualidade dos nossos produtos e pela satisfação das
            nossas cheirosas. Para garantir transparência e segurança nas compras, nossa política
            de troca e devolução segue os critérios abaixo:
          </p>

          <section>
            <h3 className="font-sans text-base font-semibold text-ink mb-2">
              1. Condições para Troca e Devolução
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>O produto deve estar lacrado e na embalagem original, sem sinais de uso.</li>
              <li>A solicitação deve ser feita em até 7 dias corridos após o recebimento (conforme o Código de Defesa do Consumidor).</li>
              <li>Em casos de defeito, vazamento ou erro no pedido, o cliente deve fornecer fotos e vídeos para análise antes da aprovação da troca ou devolução.</li>
            </ul>
          </section>

          <section>
            <h3 className="font-sans text-base font-semibold text-ink mb-2">
              2. Produtos que NÃO possuem troca ou devolução
            </h3>
            <ul className="space-y-1">
              <li>❌ <strong className="text-ink">Decants</strong> – Por serem fracionados e manipulados individualmente, não aceitamos devolução ou troca.</li>
              <li>❌ <strong className="text-ink">Perfumes Caixa Tester</strong> – São versões para demonstração, vendidas a preços especiais e sem embalagem convencional. Não realizamos trocas ou devoluções desses produtos.</li>
              <li>❌ <strong className="text-ink">Produtos abertos e testados</strong> – Perfumes são itens de uso pessoal, e por isso, não aceitamos devolução por arrependimento ou mudança de preferência na fragrância.</li>
              <li>❌ <strong className="text-ink">Insatisfação com a Fragrância ou Fixação</strong> – Não realizamos trocas ou devoluções devido à percepção pessoal da fragrância ou fixação do perfume (detalhes na cláusula 7).</li>
            </ul>
          </section>

          <section>
            <h3 className="font-sans text-base font-semibold text-ink mb-2">
              3. Motivos Aceitos para Troca ou Devolução
            </h3>
            <ul className="space-y-1">
              <li>✅ <strong className="text-ink">Produto com defeito</strong> – Embalagem danificada, vazamento, borrifador com problema.</li>
              <li>✅ <strong className="text-ink">Erro no pedido</strong> – Caso o cliente receba um item diferente do comprado.</li>
              <li>✅ <strong className="text-ink">Danos no transporte</strong> – Se o produto chegar avariado devido à entrega.</li>
            </ul>
          </section>

          <section>
            <h3 className="font-sans text-base font-semibold text-ink mb-2">
              4. Como Solicitar a Troca ou Devolução
            </h3>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Enviar um WhatsApp com o número do pedido e a descrição do problema.</li>
              <li>Enviar fotos e vídeos do produto para análise.</li>
              <li>Nossa equipe analisará a solicitação em até 48h úteis.</li>
              <li>Se aprovado, o cliente recebe um código de postagem para envio.</li>
              <li>Após o recebimento e conferência do produto, realizamos a troca ou reembolso.</li>
            </ol>
          </section>

          <section>
            <h3 className="font-sans text-base font-semibold text-ink mb-2">
              5. Reembolso e Créditos
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>O reembolso pode ser feito via Pix, estorno no cartão ou vale-compras.</li>
              <li>Caso o defeito seja confirmado, a loja cobre os custos de envio e reenvio.</li>
              <li>Em caso de erro na escolha da fragrância, não realizamos troca ou reembolso.</li>
            </ul>
          </section>

          <section>
            <h3 className="font-sans text-base font-semibold text-ink mb-2">
              6. Reformulação de Fragrâncias
            </h3>
            <p>
              <strong className="text-ink">Atenção:</strong> As fragrâncias comercializadas podem
              passar por reformulações realizadas pelos fabricantes, resultando em alterações
              sutis ou significativas no aroma original. Essas mudanças ocorrem devido a fatores
              como regulamentações internacionais, disponibilidade de matérias-primas ou
              atualizações de mercado. A Doce Essência não se responsabiliza por essas alterações
              e, portanto, não realizará trocas ou devoluções devido a diferenças percebidas na
              fragrância decorrentes de reformulações efetuadas pelos fabricantes.
            </p>
          </section>

          <section>
            <h3 className="font-sans text-base font-semibold text-ink mb-2">
              7. Insatisfação com a Fragrância ou Fixação
            </h3>
            <p className="mb-2">
              <strong className="text-ink">Atenção:</strong> Devido à natureza pessoal e subjetiva
              das fragrâncias, não efetuamos trocas ou devoluções por motivos de insatisfação com
              o aroma ou percepção de fixação do perfume. A fixação e projeção de uma fragrância
              podem variar conforme fatores como:
            </p>
            <ul className="list-disc pl-5 space-y-1 mb-2">
              <li>Tipo de pele e pH – O pH da pele pode alterar a forma como o perfume se comporta.</li>
              <li>Hidratação da pele – Peles hidratadas tendem a reter melhor o perfume.</li>
              <li>Clima e temperatura – O calor pode intensificar ou dissipar mais rápido a fragrância.</li>
              <li>Alimentação e hábitos de vida – Podem influenciar o odor natural da pele e a interação com o perfume.</li>
            </ul>
            <p>
              Recomendamos que, antes de efetuar a compra, o cliente experimente a fragrância
              desejada em sua pele para avaliar sua compatibilidade e desempenho.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
