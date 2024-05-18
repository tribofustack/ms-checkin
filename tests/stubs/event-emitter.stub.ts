import { IEventEmitter } from 'src/internal/application/ports/events/event';

export const makeEventEmitter = (): IEventEmitter => {
    class EventEmitterStub implements IEventEmitter {

        addListener(eventName: string | symbol, listener: (...args: any[]) => void): this {
            throw new Error('Method not implemented.');
        }
        on(eventName: string | symbol, listener: (...args: any[]) => void): this {
            throw new Error('Method not implemented.');
        }
        once(eventName: string | symbol, listener: (...args: any[]) => void): this {
            throw new Error('Method not implemented.');
        }
        removeListener(eventName: string | symbol, listener: (...args: any[]) => void): this {
            throw new Error('Method not implemented.');
        }
        off(eventName: string | symbol, listener: (...args: any[]) => void): this {
            throw new Error('Method not implemented.');
        }
        removeAllListeners(event?: string | symbol): this {
            throw new Error('Method not implemented.');
        }
        setMaxListeners(n: number): this {
            throw new Error('Method not implemented.');
        }
        getMaxListeners(): number {
            throw new Error('Method not implemented.');
        }
        listeners(eventName: string | symbol): Function[] {
            throw new Error('Method not implemented.');
        }
        rawListeners(eventName: string | symbol): Function[] {
            throw new Error('Method not implemented.');
        }
        emit(eventName: string | symbol, ...args: any[]): boolean {
            return true
        }
        listenerCount(eventName: string | symbol, listener?: Function): number {
            throw new Error('Method not implemented.');
        }
        prependListener(eventName: string | symbol, listener: (...args: any[]) => void): this {
            throw new Error('Method not implemented.');
        }
        prependOnceListener(eventName: string | symbol, listener: (...args: any[]) => void): this {
            throw new Error('Method not implemented.');
        }
        eventNames(): (string | symbol)[] {
            throw new Error('Method not implemented.');
        }

    }

    return new EventEmitterStub()
}