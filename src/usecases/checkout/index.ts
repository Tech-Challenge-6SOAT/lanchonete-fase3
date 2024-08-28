import { Produto, Status, PagamentoStatus } from "../../entities";
import { ClienteGateway, ProdutoGateway } from "../../gateways";
import { PagamentoUseCase } from "../pagamento";
import { PedidoUseCase } from "../pedido";
import { CPF } from "../../value-objects/cpf";

export class CheckoutUseCase {
    private _produtos: { produto: Produto, quantidade: number }[] = [];

    constructor(
        private readonly pagamentoUseCase: PagamentoUseCase,
        private readonly pedidoUseCase: PedidoUseCase,
        private readonly produtoGateway: ProdutoGateway,
        private readonly clienteGateway: ClienteGateway
    ) { }

    async checkout({ produtos, cpf }: { produtos: { id: string, quantidade: number }[], cpf: CPF }): Promise<{ id: string, senha: string, qrcode: string }> {
        const cliente = cpf ? await this.clienteGateway.buscarCliente({ cpf: new CPF(String(cpf)) }) : null;
        await this._adicionarProdutos(produtos)

        const pedidoCriado = await this.pedidoUseCase.criar({
            cliente,
            produtos: this._produtos,
            total: this._calcularTotalPedido(this._produtos),
            status: new Status('Recebido'),
            senha: String(Math.floor(Math.random() * 10000)).padStart(4, '0'),
        })

        const { transacao, qrcode } = await this.pagamentoUseCase.gerarPagamento(pedidoCriado);

        await this.pedidoUseCase.adicionarTransacao({ id: pedidoCriado.id, transacao});

        return { id: pedidoCriado.id, senha: pedidoCriado.senha, qrcode };
    }

    private async _adicionarProdutos(produtos: { id: string, quantidade: number }[]): Promise<void> {
        if (!produtos?.length) throw new Error('Produtos não informados')
        const produtosPromises = produtos.map(async ({ id, quantidade }) => {
            const produto = await this.produtoGateway.buscarProdutoPorId(id);
            if (!produto) throw new Error('Produto não encontrado')
            return { produto: new Produto(produto.id, produto.categoria, produto.nome, produto.preco, produto.descricao), quantidade }
        });
        this._produtos = await Promise.all(produtosPromises);
    }

    private _calcularTotalPedido(produtosPedido: { produto: Produto, quantidade: number }[]): number {
        return produtosPedido.reduce((totalPedido, { produto, quantidade }) => totalPedido + (produto.preco * quantidade), 0);
    }
}
