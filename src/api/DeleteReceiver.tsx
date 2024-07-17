import { GetReceiver } from "./GetReceiver";

/**
 * 
    const token = authRef.current;
    const deleteReceiver = new DeleteReceiver();
    const deleteCommand = new SuperheroSingleCommand(
        deleteReceiver,
        token,
        superhero.id
    );
    const deleteInvoker = new SuperheroConvertInvoker(deleteCommand);
    await deleteInvoker.invoke();
 */
export class DeleteReceiver extends GetReceiver{
    protected readonly METHOD: "GET" | "DELETE" = 'DELETE';
}