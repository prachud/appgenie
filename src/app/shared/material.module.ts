import { NgModule } from '@angular/core';
import {
  MatInputModule,
  MatToolbarModule,
  MatSidenavModule,
  MatTableModule,
  MatIconModule,
  MatRadioModule,
  MatCardModule, MatButtonModule, MatSelectModule
} from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
      imports: [MatButtonModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatToolbarModule,
        MatSidenavModule,
        MatTableModule,
        MatCardModule,
        MatIconModule,
        MatRadioModule
    ],
    exports: [MatButtonModule,
      MatFormFieldModule,
      MatSelectModule,
      MatInputModule,
      MatToolbarModule,
      MatSidenavModule,
      MatTableModule,
      MatCardModule,
      MatRadioModule,
      MatIconModule
    ],
  })

  export class MaterialModule {

  }
