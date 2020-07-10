import { BaseField } from 'uniforms';

const WithUniforms = ({ children }, { uniforms }) => children(uniforms);
WithUniforms.contextTypes = BaseField.contextTypes;

export default WithUniforms;
