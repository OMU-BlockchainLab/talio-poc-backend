import SNS from 'Services/AWS/SNS'

const sendMessage = jest.fn()

export default { ...SNS, sendMessage }
