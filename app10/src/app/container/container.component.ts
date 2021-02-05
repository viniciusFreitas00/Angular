import { Component } from "@angular/core";

@Component({
  selector: "app-container",
  templateUrl: "./container.component.html",
  styleUrls: ["./container.component.css"],
})
export class ContainerComponent {
  public item1: string = "teste";
  public item2: string = "teste";

  public Somar(): void {
    console.log(this.item1);
    console.log(this.item2);
  }

  public attItem1(item1: Event): void {
    // Atualiza a item1.
    this.item1 = (<HTMLInputElement>item1.target).value;
  }
  public attItem2(item2: Event): void {
    // Atualiza a item2.
    this.item2 = (<HTMLInputElement>item2.target).value;
  }
}
