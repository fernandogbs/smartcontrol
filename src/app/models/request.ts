export interface Request{
    id: number;
    price: number;
    amount: number;
    mail: string;
    buyerName: string;
    cpf: number;
    address: string;
    adressNumber: number;
    adressComplement: string;
    cep: number;
    city: string;
    state: string;
    paymentMethod: string;
    cardNumber: number;
    cardName: string;
    cardExpirationDate: string;
    cardCvv: number
    phoneNumber: number;
}