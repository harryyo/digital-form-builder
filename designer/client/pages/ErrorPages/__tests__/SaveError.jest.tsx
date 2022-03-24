import React from "react";
import { SaveError } from "../SaveError";
import {
  render,
  cleanup,
  fireEvent,
  screen,
  waitFor,
} from "@testing-library/react";

describe("SaveErrorPage", () => {
  afterEach(() => jest.resetAllMocks());
  afterEach(cleanup);

  test("should render correctly", async () => {
    const push = jest.fn();
    const history = { push: push };
    const location = { state: { id: "testid" } };
    const { asFragment } = render(
      <SaveError history={history} location={location} />
    );
    expect(await screen.findByText("Back to Designer")).toBeInTheDocument();
    expect(
      await screen.findByText("Sorry, there is a problem with the service")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("An error occurred while saving.")
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        "Is the runner up and running and in development mode? Check console log and see docs for runner requirements when using the designer."
      )
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        "If the runner is up and in development mode, the last valid version of your form will have been saved."
      )
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Return to the Designer to continue.")
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        "If everything appears configured according to the docs, so we can check what went wrong please complete the following:"
      )
    ).toBeInTheDocument();
    expect(
      await screen.findByText("download your crash report")
    ).toBeInTheDocument();

    expect(
      await screen.findByText("create an issue on GitHub")
    ).toBeInTheDocument();

    expect(
      screen.getByText("create an issue on GitHub").closest("a")
    ).toHaveAttribute(
      "href",
      "https://github.com/XGovFormBuilder/digital-form-builder/issues/new?template=bug_report.md"
    );
  });

  test("back link should take back to designer page", async () => {
    const push = jest.fn();
    const history = { push: push };
    const location = { state: { id: "testid" } };
    render(<SaveError history={history} location={location} />);
    expect(await screen.findByText(/Back to Designer/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText("Back to Designer"));
    await waitFor(() => expect(push).toHaveBeenCalledTimes(1));
    expect(push).toBeCalledWith("designer/testid");
  });
});
