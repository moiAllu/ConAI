import Replicate from "replicate";

const replicate = new Replicate({
    auth:"r8_R0MNpeDhuFp7VSGwboPdZIWvgdna68L1H9Ty0",
}) as any;

export const replicateTest = async () => {
    const input = {
        prompt:""
    };
    const output = await replicate.run("konieshadow/fooocus-api-realistic:612fd74b69e6c030e88f6548848593a1aaabe16a09cb79e6d714718c15f37f47", { input });
    console.log(output)
}
export default replicate;
