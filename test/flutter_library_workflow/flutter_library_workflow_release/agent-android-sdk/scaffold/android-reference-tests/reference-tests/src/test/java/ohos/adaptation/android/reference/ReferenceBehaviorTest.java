package ohos.adaptation.android.reference;

import static com.google.common.truth.Truth.assertThat;

import android.content.Context;

import androidx.test.core.app.ApplicationProvider;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.robolectric.RobolectricTestRunner;

@RunWith(RobolectricTestRunner.class)
public class ReferenceBehaviorTest {

    @Test
    public void scaffold_isConfigured() {
        Context context = ApplicationProvider.getApplicationContext();
        Runnable callback = Mockito.mock(Runnable.class);

        callback.run();

        assertThat(context).isNotNull();
        Mockito.verify(callback).run();
    }
}

