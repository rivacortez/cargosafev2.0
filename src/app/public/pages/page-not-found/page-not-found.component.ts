import { Component } from '@angular/core';
import {ToolbarContentComponent} from "../../components/toolbar-content/toolbar-content.component";

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [
    ToolbarContentComponent
  ],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.css'
})
export class PageNotFoundComponent {

}
