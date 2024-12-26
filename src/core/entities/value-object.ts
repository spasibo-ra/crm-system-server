export abstract class ValueObject<Props> {
  protected props: Props;
  constructor(props: Props) {
    this.props = props;
  }
}
