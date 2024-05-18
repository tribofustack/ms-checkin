import { IIdentifierGenerator } from 'src/internal/application/ports/tokens/id-generator'

export const makeIdGenerator = (): IIdentifierGenerator => {
    class IdGeneratorStub implements IIdentifierGenerator {
      generate(): string {
        return "id-generated-by-test"
      }
    }
    return new IdGeneratorStub()
  }