describe('Automation Exercise', () => {
    // Gerar email único para evitar conflitos
    const timestamp = Date.now()
    const email = `teste${timestamp}@teste.com`
    const senha = '@12345678'
    const nome = 'Maycon'

    beforeEach(() => {
        // Visitar o site antes de cada teste
        cy.visit('https://automationexercise.com/')
    })

    it('TC01: Cadastro do Usuario', () => {
        // clicar em Signup/Login
        cy.get('a[href="/login"]').click()
        // preencher o formulario de cadastro
        cy.get('input[data-qa="signup-name"]').type(nome)
        // digite email único
        cy.get('input[data-qa="signup-email"]').type(email)
        // clicar em Signup button
        cy.get('button[data-qa="signup-button"]').click()
        // preencher informações do formulário de cadastro
        cy.get('input[data-qa="password"]').type(senha)
        cy.get('input[data-qa="first-name"]').type('Maycon')
        cy.get('input[data-qa="last-name"]').type('Santos')
        cy.get('input[data-qa="address"]').type('Rua Teste, 123')
        cy.get('input[data-qa="state"]').type('São Paulo')
        cy.get('input[data-qa="city"]').type('São Paulo')
        cy.get('input[data-qa="zipcode"]').type('01234567')
        cy.get('input[data-qa="mobile-number"]').type('11999999999')
        // clicar em Create Account button
        cy.get('button[data-qa="create-account"]').click()
        // verificar se a mensagem de sucesso foi exibida
        cy.get('h2[data-qa="account-created"]').should('be.visible')
        cy.contains('Account Created!').should('be.visible')
        // clicar em Continue
        cy.get('a[data-qa="continue-button"]').click()
        // verificar se está logado
        cy.contains('Logged in as').should('be.visible')
        cy.contains(nome).should('be.visible')
        // clicar em Logout
        cy.get('a[href="/logout"]').click()
        // verificar se foi deslogado
        cy.url().should('include', '/login')
    })

    it('TC02: Login do Usuario', () => {
        // Primeiro criar uma conta para testar o login
        cy.get('a[href="/login"]').click()
        cy.get('input[data-qa="signup-name"]').type(nome)
        cy.get('input[data-qa="signup-email"]').type(email)
        cy.get('button[data-qa="signup-button"]').click()
        cy.get('input[data-qa="password"]').type(senha)
        cy.get('input[data-qa="first-name"]').type('Maycon')
        cy.get('input[data-qa="last-name"]').type('Santos')
        cy.get('input[data-qa="address"]').type('Rua Teste, 123')
        cy.get('input[data-qa="state"]').type('São Paulo')
        cy.get('input[data-qa="city"]').type('São Paulo')
        cy.get('input[data-qa="zipcode"]').type('01234567')
        cy.get('input[data-qa="mobile-number"]').type('11999999999')
        cy.get('button[data-qa="create-account"]').click()
        cy.get('a[data-qa="continue-button"]').click()
        cy.get('a[href="/logout"]').click()

        // Agora testar o login
        cy.get('a[href="/login"]').click()
        // preencher email e senha
        cy.get('input[data-qa="login-email"]').type(email)
        cy.get('input[data-qa="login-password"]').type(senha)
        // clicar em Login
        cy.get('button[data-qa="login-button"]').click()
        // verificar se está logado
        cy.contains('Logged in as').should('be.visible')
        cy.contains(nome).should('be.visible')
    })

    it('TC03: Adicionar Produto ao Carrinho', () => {
        // Adicionar produto ao carrinho sem login
        cy.get('a[href="/products"]').click()
        // Aguardar carregamento dos produtos
        cy.get('.features_items').should('be.visible')
        // Clicar no primeiro produto
        cy.get('.product-image-wrapper').first().within(() => {
            cy.get('a').first().click()
        })
        // Adicionar ao carrinho
        cy.get('button[type="button"]').contains('Add to cart').click()
        // Verificar modal de confirmação
        cy.get('#cartModal').should('be.visible')
        cy.contains('Your product has been added to cart').should('be.visible')
        // Clicar em View Cart
        cy.get('a[href="/view_cart"]').contains('View Cart').click()
        // Verificar se o produto está no carrinho
        cy.url().should('include', '/view_cart')
        cy.get('.cart_info').should('be.visible')
    })

    it('TC04: Verificar Carrinho', () => {
        // Adicionar produto ao carrinho
        cy.get('a[href="/products"]').click()
        cy.get('.features_items').should('be.visible')
        cy.get('.product-image-wrapper').first().within(() => {
            cy.get('a').first().click()
        })
        cy.get('button[type="button"]').contains('Add to cart').click()
        cy.get('a[href="/view_cart"]').contains('View Cart').click()
        
        // Verificar elementos do carrinho
        cy.get('.cart_info').should('be.visible')
        cy.get('.cart_description').should('be.visible')
        cy.get('.cart_price').should('be.visible')
        cy.get('.cart_quantity').should('be.visible')
        cy.get('.cart_total').should('be.visible')
        // Verificar botão de checkout
        cy.contains('Proceed To Checkout').should('be.visible')
    })

    it('TC05: Finalizar Compra', () => {
        // Primeiro fazer login
        cy.get('a[href="/login"]').click()
        cy.get('input[data-qa="signup-name"]').type(nome)
        cy.get('input[data-qa="signup-email"]').type(email)
        cy.get('button[data-qa="signup-button"]').click()
        cy.get('input[data-qa="password"]').type(senha)
        cy.get('input[data-qa="first-name"]').type('Maycon')
        cy.get('input[data-qa="last-name"]').type('Santos')
        cy.get('input[data-qa="address"]').type('Rua Teste, 123')
        cy.get('input[data-qa="state"]').type('São Paulo')
        cy.get('input[data-qa="city"]').type('São Paulo')
        cy.get('input[data-qa="zipcode"]').type('01234567')
        cy.get('input[data-qa="mobile-number"]').type('11999999999')
        cy.get('button[data-qa="create-account"]').click()
        cy.get('a[data-qa="continue-button"]').click()

        // Adicionar produto ao carrinho
        cy.get('a[href="/products"]').click()
        cy.get('.features_items').should('be.visible')
        cy.get('.product-image-wrapper').first().within(() => {
            cy.get('a').first().click()
        })
        cy.get('button[type="button"]').contains('Add to cart').click()
        cy.get('a[href="/view_cart"]').contains('View Cart').click()
        
        // Proceder para checkout
        cy.contains('Proceed To Checkout').click()
        // Verificar endereço de entrega
        cy.get('.address_delivery').should('be.visible')
        // Verificar resumo do pedido
        cy.get('.cart_info').should('be.visible')
        // Adicionar comentário
        cy.get('textarea[name="message"]').type('Pedido de teste automatizado')
        // Finalizar pedido
        cy.get('a[href="/payment"]').click()
        // Preencher dados do cartão (dados de teste)
        cy.get('input[name="name_on_card"]').type('Maycon Santos')
        cy.get('input[name="card_number"]').type('1234567890123456')
        cy.get('input[name="cvc"]').type('123')
        cy.get('input[name="expiry_month"]').type('12')
        cy.get('input[name="expiry_year"]').type('2025')
        // Confirmar pagamento
        cy.get('button[data-qa="pay-button"]').click()
        // Verificar mensagem de sucesso
        cy.contains('Order Placed!').should('be.visible')
        cy.contains('Congratulations! Your order has been confirmed').should('be.visible')
    })
})